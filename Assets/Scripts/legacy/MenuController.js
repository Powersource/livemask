#pragma strict

function Start () {

}

function Update () {

}

function createServer(){
	Network.InitializeServer(6, 25000, false);
	Application.LoadLevel("scene0");
}

function connectToServer(){
	Network.Connect(GameObject.Find("IPField").GetComponent(UI.InputField).text, 25000); //unity says InputField doesn't work here but fuck it
	Application.LoadLevel("scene0");
}