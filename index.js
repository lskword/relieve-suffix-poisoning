const fs = require('fs');
const path = require('path');

// 定义需要更改后缀名的文件夹路径和正则表达式
const folderPath = './oldlist'; // 替换为你的文件夹路径
const regexPattern = /\.new$/; // 替换为你想要匹配的正则表达式
const newFileName = '.new_12323'; // 替换为你想要的新文件名

// 定义递归函数
export default function renameFilesRecursively({folderPath, regexPattern, newFileName}) {
    // 读取文件夹中的所有文件和子文件夹
    fs.readdir(folderPath, (err, items) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        items.forEach(item => {
            const itemPath = path.join(folderPath, item);

            // 检查是否为文件还是文件夹
            fs.stat(itemPath, (err, stats) => {
                if (err) {
                    console.error('Error checking file stats:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    // 如果是文件夹，递归调用函数
                    renameFilesRecursively(itemPath);
                } else if (stats.isFile()) {
                    // 如果是文件，使用正则表达式匹配文件名
                    if (regexPattern.test(item)) {
                        const newFilePath = path.join(folderPath, item.replace(regexPattern, newFileName));
                        // 重命名文件
                        fs.rename(itemPath, newFilePath, err => {
                            if (err) {
                                console.error('Error renaming file:', err);
                            } else {
                                console.log(`Renamed ${itemPath} to ${newFilePath}`);
                            }
                        });
                    }
                }
            });
        });
    });
}


