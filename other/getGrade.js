function getGrade(score) {
    if(score === 100){
      return "A++"
    }else if(score < 100 && score >= 90){
      return "A"
    }else if(score < 90 && score >= 80){
      return "B"
    }else if(score < 80 && score >= 70){
      return "C"
    }else if(score < 70 && score >= 59){
      return "D"
    }else{
      return "F"
    }
  }
  
  console.log(getGrade(100));
  console.log(getGrade(82));
  console.log(getGrade(56));
  