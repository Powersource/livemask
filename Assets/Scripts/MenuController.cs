using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class MenuController : MonoBehaviour {
	void Start() {

	}

	void Update() {

	}

	private void createServer() {
		Network.InitializeServer(6, 25000, false);
		Application.LoadLevel("scene0");
	}

	private void connectToServer() {
		Network.Connect(GameObject.Find("IPField").GetComponent<InputField>().text, 25000); //unity says InputField doesn't work here but fuck it
		Application.LoadLevel("scene0");
	}
}