import puppeteer from 'puppeteer';

async function loginAndFetch(studentAccount: string, studentPassword: string): Promise<string | number> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        console.log("Wait for 20 seconds max ...");
        
        await page.goto('https://sju.linways.com/student', {
            waitUntil: 'networkidle2',
        });

        await page.type('input[name="studentAccount"]', studentAccount);
        await page.type('input[name="studentPassword"]', studentPassword);

        await Promise.all([
            page.click('button[type="submit"]'),
            page.waitForNavigation({ waitUntil: 'networkidle2' })
        ]);
        
        await page.evaluate(() =>{
            if (document.querySelector('red')) {
                throw new Error('Login failed. Please check your credentials.');
        }})

        await page.goto('https://sju.linways.com/student/student.php?menu=home',{
            waitUntil: 'networkidle2'
        });

        //scrapping page 1

        await page.waitForSelector('.pic_space');
        const student_image = await page.evaluate(()=>{
            const imgTag : any = document.querySelector('.pic_space');
            return imgTag? imgTag.src : null;
        })

        console.log({student_image});
        
        await page.goto('https://sju.linways.com/student/student.php?menu=student_details&action=frm_edit', {
            waitUntil: 'networkidle2'
        });

       //scrapping page 2
       await page.waitForSelector('td');

       const page2_data:any= await page.evaluate(()=>{
        const tdTags = document.querySelectorAll('td');
        const texts = Array.from(tdTags).map((tag) => tag.innerText)
        return texts;
       }) 
       
       //page2 segregation 

       const page2_info :any= {};
       for(let l=0; l<page2_data.length ; l=l+2){
        if(l !== 14){
        page2_info[page2_data[l]] = page2_data[l+1];
        }
       }
       console.log(page2_info);
       
       return 1;

    } catch (error) {
        console.error('Error during login and fetch:');
        console.log('----------------------------------');
        console.log('Bkl ,file open kar ke line 71 pe , apna student id aur password dal ... ');
        console.log('----------------------------------');
        return -1; // Return -1 if login fails
    } finally {
        await browser.close();
    }
}

// Example usage:
loginAndFetch('233bcac00', 'laudeHoTum') 
    .then(content => {
        // Handle the fetched content
        console.log('Fetched content:', content );
    })
    .catch(error => {
        console.error('Error:', error);
    });
