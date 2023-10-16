import {
    Project
  } from "ts-morph";
  
  // initName is name of the interface file below the root, ./src is considered the root
  const Keys = (intName: string, interfaceName: string): string[] => {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(`./types/${intName}.ts`);
    const node = sourceFile.getInterface(interfaceName)!;
    const allKeys = node.getProperties().map((p) => p.getName());
  
    return allKeys;
  };
  
  export default Keys;