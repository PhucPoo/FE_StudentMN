export interface User {
    id: number;
    username: string;
    fullName: string;
    email: string;
    roleId: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    isDelete?: boolean | null;

}

export interface Class {
    id: number;
    className: string;
    courseYear: number;
    majorId: number;
    teacherId: number;
    teacher?: Teacher | null;
    major?: Major | null;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    isDelete?: boolean | null;


}

export interface Teacher {
    id: number;

    avt?: string | null;
    teacherCode?: string | null;
    fullName?: string | null;

    dateOfBirth: string;
    gender?: string | null;

    email?: string | null;
    phoneNumber?: string | null;
    address?: string | null;

    majorId: number;
    userId: number;

    user?: User | null;
    major?: Major | null;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    isDelete?: boolean | null;

}

export interface User {
    id: number;
    username: string;
    fullName: string;
    email: string;
    roleId: number;
    role?: Role | null;
    refreshToken?: string | null;
    refreshTokenExpiryTime?: string | null;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    isDelete?: boolean | null;

}

export interface Major {
    id: number;
    majorName?: string | null;
    description?: string | null;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    isDelete?: boolean | null;

}
export interface Role {
    id: number;
    name: string;
    description?: string | null;
}
export interface Permission {
    id: number;
    permissionName: string;
    description: string;
    isAssigned: boolean;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}
export interface Enrollment {
    id: number;
    student: Student;
    courseSection: CourseSection;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    isDelete?: boolean | null;

}

export interface Student {
    id: number;
    avt?: string | null;
    studentCode?: string | null;
    dateOfBirth: string;
    gender?: string | null;
    course?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    userId: number;
    user?: User | null;
    classId: number;
    class?: Class | null;
    createdAt?: string;
    updatedAt?: string;
    isDelete?: boolean | null;
}
export interface CourseSection {
    id: number;
    sectionCode: string;
    semester: string;
    maxStudents: number;
    subject: Subject;
    teacher: Teacher;

    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    isDelete?: boolean | null;

}
export interface Subject {
    id: number;
    subjectCode: number;
    subjectName?: string | null;
    credits: number;
    majorId: number;
    major?: Major | null;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    isDelete?: boolean | null;

}



