import { BadRequestException, Injectable } from '@nestjs/common';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { CommonService } from '../common/common.service';


@Injectable()
export class FilesService {

    constructor(private readonly commonService: CommonService) { }

    async uploadFile(file: Express.Multer.File) {

        const { storage } = this.commonService

        if (!file) throw new BadRequestException('No existe el archivo');

        const fileExtension = file.mimetype.split('/')[1];
        const fileName = `${v4()}.${fileExtension}`;

        const storageRef = ref(storage, fileName)

        return { fileName, file: await uploadBytes(storageRef, file.buffer) }
    }

    async uploadFileWithName(file: Express.Multer.File, fileName: string) {

        const { storage } = this.commonService

        if (!file) throw new BadRequestException('No existe el archivo');

        const storageRef = ref(storage, fileName)

        return { fileName, file: await uploadBytes(storageRef, file.buffer) }
    }

    async downloadFile(fileName: string) {
        const { storage } = this.commonService
        const storageRef = ref(storage, fileName)

        return await getDownloadURL(storageRef)
    }

    async removeFile(fileName: string) {
        const { storage } = this.commonService
        const storageRef = ref(storage, fileName)

        return await deleteObject(storageRef)
    }

}
