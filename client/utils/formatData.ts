import { formatDate } from './formatDate';
export const formatData = (arr: any): any => {
  const newFormat = arr.map((elem: any, idx: number) => {
    if (elem.createdDate) {
    }

    return {
      ...elem,
      ...(elem.createdDate && { createdDate: formatDate(elem.createdDate) }),
      ...(elem.updatedDate && { updatedDate: formatDate(elem.updatedDate) }),
      ...(elem.category && { category: elem.category.title }),
      ...(elem.role && { role: elem.role.title }),
    };
  });

  return newFormat;
};
