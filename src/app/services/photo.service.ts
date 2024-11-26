import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

  export class PhotoService {

    constructor(private http: HttpClient) {}
    private serverUrl = 'http://127.0.0.1:5000/clasificar';
    public async addFoto() {
      const captura_foto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100
      });
      const fotoBase64 = captura_foto.base64String;

      if (fotoBase64) {
        this.enviarFoto(fotoBase64);
      }
    }

    private enviarFoto(fotoBase64: string) {
      const datos = { imagen: fotoBase64 };

      this.http.post(this.serverUrl, datos).subscribe({
        next: (response: any) => {
          console.log('Clasificacion del rostro: ', response.clase);
          alert(`El rostro pertenece a: ${response.clase}`)
        },
        error: (error) => {
          console.error('Error al clasificar la imagen:', error);
        },
      });
    }
  }
