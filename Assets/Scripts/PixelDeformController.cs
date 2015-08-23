using UnityEngine;
using System.Collections;

public class PixelDeformController : MonoBehaviour {
	public Texture2D origTexture;

	private Texture2D boxTexture;
	private int boxTextureSide = 500;
	private Vector2[] explosionLocations;
	private int r = 250;
	private Color boxColor = new Color(1, 0, 0, 1);//Color.black;

	void Start() {
		//boxTexture = pixelBox.GetComponent(SpriteRenderer).sprite.
		//explosionLocations = new Array();
		explosionLocations = new Vector2[0];
		//this.GetComponent(NetworkView).observed=this.GetComponent(PixelDeformController);

		StartCoroutine(RenderPixelBox());
	}

	void Update() {

	}

	void FixedUpdate() {
	}


	public void addExplosion(Vector3 pos) {
		//recreate explosionLocations[] and add one element each time this function is run.
		//then use the array for updating RenderPixelBox(). maybe put a function inside the if(insidecircle) to test for all the circles
		//explosionLocations.Add(pos);
		Vector2[] tempArr = new Vector2[explosionLocations.Length];
		explosionLocations.CopyTo(tempArr, 0);
		explosionLocations = new Vector2[tempArr.Length + 1];
		tempArr.CopyTo(explosionLocations, 0);
		explosionLocations[explosionLocations.Length - 1] = pos;
		StartCoroutine(RenderPixelBox());
	}

	private IEnumerator RenderPixelBox() {
		boxTexture = Instantiate(origTexture);
		//boxTexture = 
		int W = 500;
		int H = 500;
		Color[] colors = new Color[W * H];

		for (var y = 0; y < H; y++) {
			for (var x = 0; x < W; x++) {
				if (!IsInsideCircles(x, y)) {
					colors[y * W + x] = boxColor;
				}
			}
			//dividing it up into 6 (atm) chunks, one chunk gets to run each frame until it finishes
			if (y % (H / 6) == 0) {
				yield return null;
			}
		}

		GameObject.Destroy(this.GetComponent<PolygonCollider2D>());

		boxTexture.SetPixels(0, 0, W, H, colors);
		boxTexture.Apply();

		//find a way to dynamically update the sprite's texture instead of creating new sprites all the time.

		this.GetComponent<SpriteRenderer>().sprite = Sprite.Create(boxTexture, new Rect(0, 0, boxTextureSide, boxTextureSide), new Vector2(0, 0));
		this.gameObject.AddComponent<PolygonCollider2D>();
	}

	private bool IsInsideCircles(int x, int y) {
		//if((x-xo)*(x-xo) + (y-yo)*(y-yo) <= r*r){
		for (var i = 0; i < explosionLocations.Length; i++) {
			if ((x - explosionLocations[i].x) * (x - explosionLocations[i].x) + (y - explosionLocations[i].y) * (y - explosionLocations[i].y) <= r * r) {
				return true;
			}
			//it was this little (seemingly) innocent line of code that crashed unity.
			//i guess it wasn't too smart to print 250 000 lines of logging
			//Debug.Log(explosionLocations[i]);
		}
		return false;
	}
}