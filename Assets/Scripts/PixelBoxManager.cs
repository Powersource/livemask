using UnityEngine;
using System.Collections;

public class PixelBoxManager : MonoBehaviour {
	public GameObject box;

	private GameObject[] boxes;

	void Start() {
		boxes = new GameObject[4];
		for (var y = 0; y < 2; y++) {
			for (var x = 0; x < 2; x++) {
				boxes[y * 2 + x] = Instantiate(box);
				boxes[y * 2 + x].transform.position = new Vector2(-5 + 5 * x, -10 + 5 * y);
			}
		}

		//this shouldn't be here, but for the sake of not having to swap scenes atm.
		Network.InitializeServer(6, 25000, false);
	}

	void Update() {
		//left click
		if (Input.GetMouseButtonDown(0)) {
			//explosion((Camera.main.ScreenToWorldPoint(Input.mousePosition)-boxes[i].transform.position)*100);
			this.GetComponent<NetworkView>().RPC("explosion", RPCMode.All, Camera.main.ScreenToWorldPoint(Input.mousePosition));
		}
		//right click
		if (Input.GetMouseButtonDown(1)) {
		}
		//middle click
		if (Input.GetMouseButtonDown(2)) {
		}
	}

	void FixedUpdate() {
		Camera.main.transform.position = GameObject.Find("Physics box").transform.position + new Vector3(0, 0, -10);
	}

	[RPC]
	private void explosion(Vector3 pos) {
		//replace with that circle-detect thing that checks for colliders, should improve performance
		Collider2D[] foundCircles = Physics2D.OverlapCircleAll(pos, 2.5f, 1 << 8); //gotta love that AllLayers is simply -1
		Vector3 adjustedPos;
		for (var i = 0; i < foundCircles.Length; i++) {
			adjustedPos = (pos - foundCircles[i].transform.position) * 100;
			foundCircles[i].GetComponent<PixelDeformController>().addExplosion(adjustedPos);
			//boxes[i].GetComponent(NetworkView).RPC("addExplosion", RPCMode.All, (Camera.main.ScreenToWorldPoint(Input.mousePosition)-boxes[i].transform.position)*100);
			//addExplosion(Vector2(250,250));
			
			//Debug.Log("x: " + Input.mousePosition.x + " y: " + Input.mousePosition.y + "box#: " + i);
		}
	}
}