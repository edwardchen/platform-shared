export interface IReferenceData<T> {
    type: T;
    id: string;
  }

interface IOneToManyReference<T> {
    data: Array<IReferenceData<T>>;
  }

export interface IInspection {
    id: string;
    type: 'inspection';
    attributes: {
      notes: string | null;
      summary: string | null;
      listing_id: number;
      created_at: string | null;
    };
    relationships: {
      inspection_items: IOneToManyReference<'inspection_item'>;
    };
  }
