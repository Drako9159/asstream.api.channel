import IEntry from "./IEntry";

export default interface ICategoryModel {
  name: string;
  entries: Array<IEntry>;
}
