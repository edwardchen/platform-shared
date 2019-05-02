import merge from 'lodash/merge';

const jsonApiMergerHelper = (id, type, normalizedData, level, maxLevel) => {
  if (id && type && normalizedData[type][id]) {
    const { relationships = {}, attributes, links } = normalizedData[type][id];
    /*
     * Iterate through the relationships and add their data as a child.
     * Structure example:
     * relationships: {
     *   ...
     *   assignee: {
     *     data: { type: "user", id: "1234" }
     *   },
     *   lead_comments: {
     *     data: [{ type: "lead_comment", id: "4321" }]
     *   }
     *   ...
     * })
     */
    const relationshipData = Object.entries(relationships).map(([association, { data }]) => {
      let mergedData;
      if (data && (level + 1) <= maxLevel) {
        if (Array.isArray(data)) {
          mergedData = data.map(({ id: rId, type: rType }) =>
            jsonApiMergerHelper(
              rId,
              rType,
              normalizedData,
              level + 1,
              maxLevel,
            ));
        } else {
          mergedData = jsonApiMergerHelper(
            data.id,
            data.type,
            normalizedData,
            level + 1,
            maxLevel,
          );
        }
      }
      return { [association]: mergedData };
    });
    return merge({ links }, attributes, { id, type }, ...relationshipData);
  }
  return {};
};
/*
 * This function takes an id, type, and normalized json-api data and merges all
 * the relationships of that type and id into one object.
 *
 * Infinite recursion isn't currently a concern since I don't include
 * relationships of related elements, but someone could so I added maxLevel.
 */
export default (id, type, normalizedData, maxLevel = 1) =>
  jsonApiMergerHelper(id, type, normalizedData, 0, maxLevel);
