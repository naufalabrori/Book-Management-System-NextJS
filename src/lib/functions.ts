/* eslint-disable @typescript-eslint/no-explicit-any */
export const minValue = (val: number, min: number) => {
    if (val < min) return min;
    return val;
  };
  
  export const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  
  export const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${day}/${month}/${year}`;
  };

  export function objectToFormData(obj: any) {
    const formData = new FormData();
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value instanceof Object && !Array.isArray(value)) {
          for (const nestedKey in value) {
            if (value.hasOwnProperty(nestedKey)) {
              const nestedValue = value[nestedKey];
              formData.append(`${key}[${nestedKey}]`, nestedValue);
            }
          }
        } else {
          formData.append(key, value);
        }
      }
    }
  
    return formData;
  }