// export interface IReferenceData<T> {
//     type: T;
//     id: string;
//   }
//
// interface IOneToManyReference<T> {
//   data: Array<IReferenceData<T>>;
// }

export interface IInspection {
    id: string;
    type: 'inspection';
    notes: string | null;
    summary: string | null;
    listing_id: number;
    created_at: string | null;
  }
