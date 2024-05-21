// src/product/product.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll(): Promise<Product[]> {
        return await this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product> {
        return await this.productService.findOne(id);
    }

    @Get('name/:name')
    async findByName(@Param('name') name: string): Promise<Product | undefined> {
        return await this.productService.findByName(name);
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return await this.productService.create(createProductDto);
    }

    @Put(':id')
    async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        return await this.productService.update(id, updateProductDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return await this.productService.remove(id);
    }
}