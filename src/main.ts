import { hello } from "./hello";

function showHello(divName: string, name: string) {
  const elt = document.getElementById(divName);
  elt.innerText = hello(name);
}

showHello("greeting", "name1");