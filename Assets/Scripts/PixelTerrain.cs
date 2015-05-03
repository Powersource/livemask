using UnityEngine;
using System.Collections;

public class PixelTerrain : MonoBehaviour {

	GameObject box;

	PixelTerrain(int x, int y) {
		box = (GameObject)Instantiate(Resources.Load("PixelBox"));
		box.transform.position = new Vector2(x, y);
	}
}
