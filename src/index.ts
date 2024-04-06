
import { exec } from 'child_process';
import path from 'path'
import fs from 'fs';


// console.log('process.argv', process.argv)
async function main(entry: string): Promise<string> {


    return new Promise((Resolve, Reject) => {

        if (checkFile() === false) {
            Reject("file not in directory");
        }


        exec(`node ${entry}`, async (error: Error | null, stdout: string, stderr: string) => {
            if (error) {
                Reject(error);
            }
            if (stderr) {
                Reject(stderr);
            }

            try {
                fs.writeFileSync('output.txt', stdout);
                console.log('The file has been saved!');
                Resolve('The file has been saved!');
            } catch (err) {
                Reject(err);
            }



        })


    });






}



function checkFile(): boolean {
    const file = path.join(__dirname, process.argv[2])
    if (!file) {
        console.error('File not found')
        return false
    }
    return true
}



main(process.argv[2]).then((res) => {
    console.log('res', res)
}
).catch((err) => {
    console.error('err', err)
})


// console.log('checkFile', checkFile())   