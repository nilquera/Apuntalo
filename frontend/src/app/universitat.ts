import { Carrera } from './carrera';


export interface Universitat {
  id: number;
  name: string;
  carreras: Carrera[];
}
