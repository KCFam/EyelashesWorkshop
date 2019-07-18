import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  static arr1 = ["á", "à", "ả", "ã", "ạ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ",  
    "đ",  
    "é","è","ẻ","ẽ","ẹ","ê","ế","ề","ể","ễ","ệ",  
    "í","ì","ỉ","ĩ","ị",  
    "ó","ò","ỏ","õ","ọ","ô","ố","ồ","ổ","ỗ","ộ","ơ","ớ","ờ","ở","ỡ","ợ",  
    "ú","ù","ủ","ũ","ụ","ư","ứ","ừ","ử","ữ","ự",  
    "ý","ỳ","ỷ","ỹ","ỵ"];

  static arr2 = [ "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",  
    "d",  
    "e","e","e","e","e","e","e","e","e","e","e",  
    "i","i","i","i","i",  
    "o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o",  
    "u","u","u","u","u","u","u","u","u","u","u",  
    "y","y","y","y","y"];  

  constructor() { }

  static NonUnicode( text: string) : string {
    for (var i = 0; i < this.arr1.length; i++)  {  
        text = text.replace(this.arr1[i], this.arr2[i]);  
        text = text.replace(this.arr1[i].toUpperCase(), this.arr2[i].toUpperCase());  
    }  
    return text;
  }
}
