import { Student, StudentFormData, Gender } from '../types';
import { GRADES, CLASSES, CONTENT_TYPES, ADMIN_PASSWORD } from '../constants';

const STORAGE_KEY = 'aischool_data_v2';
const SETTINGS_KEY = 'aischool_settings_v1';

export interface SystemSettings {
  password?: string;
  webAppUrl?: string;
}

const NAMES_MALE = ['小明', '大寶', '小強', '阿傑', '凱文', '小華', '小龍', '家豪', '志明', '俊傑', '子軒', '承恩', '宇翔', '冠宇', '家瑋'];
const NAMES_FEMALE = ['小美', '小玉', '阿花', '美玲', '雅婷', '小娟', '心怡', '佳琪', '怡君', '淑芬', '子涵', '詠晴', '以柔', '雨萱', '思妤'];
const SURNAMES = ['王', '陳', '李', '張', '林', '黃', '吳', '劉', '蔡', '楊', '許', '鄭', '謝', '洪', '郭'];

const DESCRIPTIONS = [
  '參觀動物園的學習紀錄，認識了大象與長頸鹿。',
  '母親節卡片設計作品，使用了很溫馨的配色。',
  '第一次學會自己穿鞋子的影片紀錄！',
  '注音符號練習作業，筆畫非常工整。',
  '積木城堡搭建，展現了很棒的空間概念。',
  '唱遊課的表演，非常有活力。',
  '認識數字1-10的學習單。',
  '萬聖節裝扮照片，大家都很可愛。',
  '種植綠豆觀察日記，發現發芽了！',
  '父親節畫像，畫出了爸爸的特徵。',
  '學習分享玩具，大家都玩得很開心。',
  '戶外教學去公園撿落葉，做成了拼貼畫。'
];

// Helper to generate random int
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to pick random item from array
const randomItem = <T>(arr: T[]): T => arr[randomInt(0, arr.length - 1)];

const generateMockData = (): Student[] => {
  const students: Student[] = [];
  let idCounter = 1;

  GRADES.forEach(grade => {
    CLASSES.forEach(className => {
      // 20 students per class
      for (let i = 1; i <= 20; i++) {
        const isBoy = Math.random() > 0.5;
        const gender: Gender = isBoy ? 'boy' : 'girl';
        const surname = randomItem(SURNAMES);
        const name = isBoy ? randomItem(NAMES_MALE) : randomItem(NAMES_FEMALE);
        const fullName = `${surname}${name}`;

        students.push({
          id: idCounter.toString(),
          name: fullName,
          grade: grade,
          className: className,
          gender: gender,
          contentType: randomItem(CONTENT_TYPES),
          link: '#',
          description: randomItem(DESCRIPTIONS),
          timestamp: Date.now() - randomInt(0, 10000000), 
        });
        idCounter++;
      }
    });
  });
  
  // Shuffle the array to make the initial gallery look more interesting
  for (let i = students.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [students[i], students[j]] = [students[j], students[i]];
  }

  return students;
};

export const getStudents = (): Student[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // If empty, initialize with mock data
    const initialData = generateMockData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(stored);
};

export const addStudent = (data: StudentFormData): Student => {
  const currentData = getStudents();
  const newStudent: Student = {
    ...data,
    id: Date.now().toString(),
    timestamp: Date.now(),
  };
  
  const updatedData = [newStudent, ...currentData];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  return newStudent;
};

// --- Settings Management ---

export const getSettings = (): SystemSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const saveSettings = (settings: SystemSettings) => {
  const current = getSettings();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
};

export const checkPassword = (inputPassword: string): boolean => {
  const settings = getSettings();
  const currentPassword = settings.password || ADMIN_PASSWORD;
  return inputPassword === currentPassword;
};