export type Grade = '幼幼班' | '小班' | '中班' | '大班';

export type ClassName = '蘋果' | '香蕉' | '櫻桃' | '葡萄' | '草莓' | '檸檬';

export type Gender = 'boy' | 'girl';

export type ContentType = 'Word' | 'PPT' | 'Canva' | 'Excel' | '照片' | '影片';

export interface Student {
  id: string;
  name: string;
  grade: Grade;
  className: ClassName;
  gender: Gender;
  contentType: ContentType;
  link: string; // File link or NAS path
  description: string;
  timestamp: number;
}

export interface StudentFormData {
  name: string;
  grade: Grade;
  className: ClassName;
  gender: Gender;
  contentType: ContentType;
  link: string;
  description: string;
}

export enum ViewState {
  GALLERY = 'GALLERY',
  LOGIN = 'LOGIN',
  ADMIN = 'ADMIN',
  STUDENT_DETAIL = 'STUDENT_DETAIL',
  SETTINGS = 'SETTINGS'
}