import { SkillModel } from "./Skill.model";

export class ResumeModel {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  dateOfBirth: Date;
  city: string;
  description: string;
  skills: any[];
}
