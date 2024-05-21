// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.findAllProducts();
    }

    async findOne(id: number): Promise<Product | undefined> {
        return await this.productRepository.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<Product | undefined> {
        return await this.productRepository.findByName(name);
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        return await this.productRepository.createProduct(productDto);
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        return await this.productRepository.updateProduct(id, updateProductDto);
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.removeProduct(id);
    }
}