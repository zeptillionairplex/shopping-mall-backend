import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios'; //npm install axios

@Injectable()
export class NgrokService {
    private readonly logger = new Logger(NgrokService.name);

    async getNgrokUrl(): Promise<void> {
    try {
        // const response = await axios.get('http://localhost:4040/api/tunnels');
        const response = await axios.get('http://ngrok_container:4040/api/tunnels');
        const publicUrl = response.data.tunnels[0].public_url;
        this.logger.log(`Ngrok URL: ${publicUrl}`);
    } catch (error) {
            this.logger.error('Error fetching ngrok URL', error.toString());
        }
    }
}