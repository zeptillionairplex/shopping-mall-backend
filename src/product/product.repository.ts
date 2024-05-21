// src/product/product.repository.ts
// src/product/product.repository.ts
// src/product/product.repository.ts
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductRepository extends Repository<Product> {
    constructor(private dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }

    async findAllProducts(): Promise<Product[]> {
        return this.find();
    }

    async findByName(name: string): Promise<Product | undefined> {
        return this.findOne({ where: { name } });
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = this.create(createProductDto);
            return this.save(newProduct);
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        await this.update(id, updateProductDto);
            return this.findOne({ where: { id } });
    }

    async removeProduct(id: number): Promise<void> {
        await this.delete(id);
    }
}