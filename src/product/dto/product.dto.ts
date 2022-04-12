export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
  stock: number;
  reference: string;
  pictures: string[];
};

export type UpdateProductDto = {
  name: string;
  description: string;
  price: number;
  stock: number;
  reference: string;
  pictures: string[];
};
