async function init() {
  let rustApp = null;

  try {
    rustApp = await import("../pkg");
  } catch (e) {
    console.log(e);
    return;
  }

  console.log(rustApp);

  const input = document.getElementById("upload");
  const fileReader = new FileReader();

  //onloadend is for when the file finishes loading
  fileReader.onloadend = () => {
    //for taking the metadata out of the file string
    let base64 = fileReader.result.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );
    let img_data_url = rustApp.grayscale(base64);
    document.getElementById("new-img").setAttribute("src", img_data_url);
  };
  input.addEventListener("change", () => {
    //turn file into string
    fileReader.readAsDataURL(input.files[0]);
  });
}
init();
