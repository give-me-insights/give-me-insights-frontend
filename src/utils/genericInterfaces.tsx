export interface Action {
  type: String
}


export interface ActionReducer<Type> extends Action {
  entity: Type
}
