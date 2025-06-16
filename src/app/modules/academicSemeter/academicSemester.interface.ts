export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type academicSemesterName = 'Spring' | 'Summer' | 'Fall';

export type academicSemesterCode ='01' | '02' | '03';

export type TAcademicSemester = {
  name: academicSemesterName,
  code:academicSemesterCode ,
  year: Date,
  startMonth: TMonth,
  endMonth:TMonth,
}