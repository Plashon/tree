const folderStructure = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 3.txt", type: "file" }],
    },
  ],
};

let updatedFolderStructure = folderStructure;

function addFile() {
  // รับชื่อไฟล์และชื่อโฟลเดอร์จากผู้ใช้
  const folderName = prompt("สร้างไฟล์ใหม่ในโฟลเดอร์");
  const newFileName = prompt("ชื่อไฟล์ใหม่");

  // ค้นหาโฟลเดอร์เป้าหมาย
  const targetFolder = findFolder(updatedFolderStructure, folderName);

  // ตรวจสอบว่าโฟลเดอร์เป้าหมายมีอยู่
  if (!targetFolder) {
    console.error(`โฟลเดอร์ "${folderName}" ไม่พบ`);
    return;
  }

  // เพิ่มไฟล์ใหม่ลงในโฟลเดอร์เป้าหมาย
  targetFolder.children.push({ name: newFileName, type: "file" });

  // อัปเดต UI
  const folderTree = document.getElementById("folderTree");
  const treeElement = createTreeElement(updatedFolderStructure);
  folderTree.replaceChild(treeElement, folderTree.firstChild);

  // อัปเดต folderStructure
  folderStructure = updatedFolderStructure;
}

function addFolder() {
  // รับชื่อโฟลเดอร์ใหม่และโฟลเดอร์เป้าหมายจากผู้ใช้
  const parentFolderName = prompt("สร้างโฟลเดอร์ใหม่ในโฟลเดอร์");
  const folderName = prompt("ชื่อโฟลเดอร์ใหม่");

  // ค้นหาโฟลเดอร์เป้าหมาย
  const parentFolder = findFolder(updatedFolderStructure, parentFolderName);

  // ตรวจสอบว่าโฟลเดอร์เป้าหมายมีอยู่
  if (!parentFolder) {
    console.error(`โฟลเดอร์ "${parentFolderName}" ไม่พบ`);
    return;
  }

  // เพิ่มโฟลเดอร์ใหม่ลงในโฟลเดอร์เป้าหมาย
  parentFolder.children.push({ name: folderName, type: "folder" });

  // อัปเดต UI
  const folderTree = document.getElementById("folderTree");
  const treeElement = createTreeElement(updatedFolderStructure);
  folderTree.replaceChild(treeElement, folderTree.firstChild);

  // อัปเดต folderStructure
  folderStructure = updatedFolderStructure;
}

function createTreeElement(item) {
  const element = document.createElement("div");
  element.textContent = item.name;
  element.classList.add(item.type);

  if (item.type === "folder" && item.children) {
    const ul = document.createElement("ul");
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      ul.appendChild(childElement);
    });
    element.appendChild(ul);
  }

  return element;
}

// ฟังก์ชันค้นหาโฟลเดอร์
function findFolder(folderStructure, folderName) {
  if (folderStructure.name === folderName) {
    return folderStructure;
  }

  if (folderStructure.children.length === 0) {
    return null;
  }

  for (const child of folderStructure.children) {
    const foundFolder = findFolder(child, folderName);
    if (foundFolder) {
      return foundFolder;
    }
  }

  return null;
}

// เริ่มต้น
const folderTree = document.getElementById("folderTree");
const treeElement = createTreeElement(updatedFolderStructure);
folderTree.appendChild(treeElement);

function deleteFile() {
  // รับชื่อไฟล์และชื่อโฟลเดอร์จากผู้ใช้
  const folderName = prompt("ลบไฟล์จากโฟลเดอร์");
  const fileName = prompt("ชื่อไฟล์ที่ต้องการลบ");

  // ค้นหาโฟลเดอร์เป้าหมาย
  const targetFolder = findFolder(updatedFolderStructure, folderName);

  // ตรวจสอบว่าโฟลเดอร์เป้าหมายมีอยู่
  if (!targetFolder) {
    console.error(`โฟลเดอร์ "${folderName}" ไม่พบ`);
    return;
  }

  // ค้นหาไฟล์ที่ต้องการลบ
  const fileIndex = targetFolder.children.findIndex(
    (item) => item.name === fileName && item.type === "file"
  );

  // ตรวจสอบว่าไฟล์มีอยู่
  if (fileIndex === -1) {
    console.error(`ไฟล์ "${fileName}" ไม่พบในโฟลเดอร์ "${folderName}"`);
    return;
  }

  // ลบไฟล์ออกจากโฟลเดอร์
  targetFolder.children.splice(fileIndex, 1);

  // อัปเดต UI
  const folderTree = document.getElementById("folderTree");
  const treeElement = createTreeElement(updatedFolderStructure);
  folderTree.replaceChild(treeElement, folderTree.firstChild);

  // อัปเดต folderStructure
  folderStructure = updatedFolderStructure;
}
function deleteFolder() {
  // รับชื่อโฟลเดอร์จากผู้ใช้
  const folderName = prompt("ชื่อโฟลเดอร์ที่ต้องการลบ");

  // ค้นหาโฟลเดอร์เป้าหมาย
  const targetFolder = findFolder(updatedFolderStructure, folderName);

  // ตรวจสอบว่าโฟลเดอร์เป้าหมายมีอยู่
  if (!targetFolder) {
    console.error(`โฟลเดอร์ "${folderName}" ไม่พบ`);
    return;
  }

  // ตรวจสอบว่าโฟลเดอร์ว่างเปล่า
  if (targetFolder.children.length > 0) {
    console.error(`โฟลเดอร์ "${folderName}" มีไฟล์อยู่`);
    prompt(`โฟลเดอร์ "${folderName}" มีไฟล์อยู่`);
    return;
  }

  // ค้นหาโฟลเดอร์ที่เป็น Parent
  const parentFolder = findParentFolder(updatedFolderStructure, targetFolder);

  // ลบโฟลเดอร์ออกจากโฟลเดอร์ Parent
  parentFolder.children.splice(
    parentFolder.children.findIndex((item) => item === targetFolder),
    1
  );

  // อัปเดต UI
  const folderTree = document.getElementById("folderTree");
  const treeElement = createTreeElement(updatedFolderStructure);
  folderTree.replaceChild(treeElement, folderTree.firstChild);

  // อัปเดต folderStructure
  folderStructure = updatedFolderStructure;
}

function findParentFolder(folderStructure, targetFolder) {
  if (folderStructure.children.includes(targetFolder)) {
    return folderStructure;
  }

  if (folderStructure.children.length === 0) {
    return null;
  }

  for (const child of folderStructure.children) {
    const foundFolder = findParentFolder(child, targetFolder);
    if (foundFolder) {
      return foundFolder;
    }
  }

  return null;
}
