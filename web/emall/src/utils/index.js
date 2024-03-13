

export class UniqueProductSet extends Set {
  constructor(values) {
    super(values);
    const products = [];
    for (let value of this) {
      if (products.includes(value.id)) {
        this.delete(value);
      } else {
        products.push(value.id);
      }
    }
  }
}