interface GenericProjectFormData {
  title: string,
  description: string
}

export interface CreateProjectFormData extends GenericProjectFormData {}


export interface CreateSourceFormData extends GenericProjectFormData {}


export interface CreateProjectLinkFormData extends GenericProjectFormData {
  url: string
}

export interface CreateEventFormData extends GenericProjectFormData {
  startDate: string,
  duration: Number,
  isExpected: boolean,
  durationUnit: string
}
