import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

@Injectable()
export class CommonService {
    firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.STORAGE_AUTH_DOMAIN,
        projectId: process.env.STORAGE_PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.STORAGE_MESSAGE_SENDER,
        appId: process.env.STORAGE_APP_ID,
        measurementId: process.env.STORAGE_MEASURE_ID,
    };

    app = initializeApp(this.firebaseConfig);
    storage = getStorage(this.app)
}