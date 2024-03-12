//สร้างโครงสร้าง
const folderStructure = new TreeNode("Root Folder");
const folder1 = new TreeNode("Folder 1");
const folder2 = new TreeNode("Folder 2");

const file1 = new TreeNode("File 1.txt");
const file2 = new TreeNode("File 2.txt");
const file3 = new TreeNode("File 3.txt");

folder1.addChild(file1);
folder1.addChild(file2);
folder2.addChild(file3);

folderStructure.addChild(folder1);
folderStructure.addChild(folder2);

//แสดงโฟล์เดอร์และไฟล์
function createTreeElement(node, parentElement) {
  const element = document.createElement("div");
  element.textContent = node.name;
  element.classList.add("folder");

  element.addEventListener("click", function (event) {
    event.stopPropagation(); // Stop event from bubbling up
    toggleSelection(element);
  });

  if (node.children.length > 0) {
    node.children.forEach((child) => {
      const childElement = createTreeElement(child, element);
      element.appendChild(childElement);
    });
  }

  parentElement.appendChild(element);
  return element;
}
//เปลี่ยนสถานะการเลือก
function toggleSelection(element) {
  if (element.classList.contains("selected")) {
    element.classList.remove("selected");
  } else {
    element.classList.add("selected");
  }
}
//เพิ่มโฟลเดอร์
function addFolder() {
  const selectedElement = document.querySelector(".folder.selected");
  if (!selectedElement) {
    alert("Please select a folder to add a folder into.");
    return;
  }

  const newFolderName = prompt("Enter the name of the new folder:");
  if (!newFolderName) return; // Cancelled

  const newFolder = new TreeNode(newFolderName);

  const newFolderElement = createTreeElement(newFolder, selectedElement);
  selectedElement.appendChild(newFolderElement);
}
//เพิ่มไฟล์
function addFile() {
  const selectedElement = document.querySelector(".folder.selected");
  if (!selectedElement) {
    alert("Please select a folder to add a file into.");
    return;
  }

  const newFileName = prompt("Enter the name of the new file:");
  if (!newFileName) return; // Cancelled

  const newFileNode = new TreeNode(newFileName);

  const newFileElement = createTreeElement(newFileNode, selectedElement);
  selectedElement.appendChild(newFileElement);
}
//ลบโฟลฺเดอร์หรือไฟล์
function deleteSelected() {
  const selectedElements = document.querySelectorAll(".selected");
  if (selectedElements.length === 0) {
    alert("Please select an item to delete.");
    return;
  }

  selectedElements.forEach((element) => {
    element.parentNode.removeChild(element);
  });
}

const folderTree = document.getElementById("folderTree");
const treeElement = createTreeElement(folderStructure, folderTree);
folderTree.appendChild(treeElement);

document.getElementById("addFolderButton").addEventListener("click", addFolder);
document.getElementById("addFileButton").addEventListener("click", addFile);
document
  .getElementById("deleteButton")
  .addEventListener("click", deleteSelected);



