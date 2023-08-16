import { Module } from "@nestjs/common";
import { PdfGeneratorController } from "./pdf-generator.controller";
import { PdfGeneratorService } from "./pdf-generator.service";

@Module({
    imports:[],
    controllers:[PdfGeneratorController],
    providers:[PdfGeneratorService]
})
export class PdfGeneratorModule{}