function gname(a: string, b: string) {
  return `${a} ${b}`
}

const gnameArrow = (a: string, b: string): string => {
  return `${a} ${b}`
}

console.log(gname('m', 'n'));
console.log(gnameArrow('m2', 'n2'));

// let info: {
//   officeId: number
//   isOpened: boolean
//   contacts: {
//     phone: string
//     email: string
//     address: {
//       city: string
//     }
//   }
// };

// console.log(info);

const skills: string[] = ['de1v', 
                    'devops',  
'test',  
    'jaba']

for (const skill   of skills) {
  console.log(skill)
}

const res = skills
  .filter((s:              string) => s !== 'dev')
  .map((s) => s + '! ')
  .reduce((a, b) => a + b)
console.log(res)


enum reqStatus {
    "published" = 'published',
    "draft" = 'draft',
    "deleted" = 'deleted',
};

async function getFaqs(req: {topicId: number; status?: reqStatus}): Promise<{
    question: string;
    answer: string;
    tags: string[];
    likes: number;
    status: reqStatus;
}> {
    const res = await fetch('/faqs', {
        method: 'POST',
        body: JSON.stringify(req)
    });

    const data = await res.json();
    return data;
}


