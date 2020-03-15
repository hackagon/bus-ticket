const _ = require("lodash");

const person_1 = {
  name: "Nguyen Van A",
  year: 2000,
  educations: [
    {
      university_1: {
        name: "ABC",
        major: "IY"
      }
    },
    // {
    //   university_2: {
    //     name: "Yale",
    //     major: "Law"
    //   }
    // }
  ]
}

if (person_1 && person_1.educations[1] && person_1.educations[1].university_2) {
  console.log(person_1.educations[1].university_2.major)
}

console.log(_.get(person_1, "educations[1].university_2.major", "Khong ton tai")) 