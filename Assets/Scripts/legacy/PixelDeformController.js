#pragma strict

public var origTexture:Texture2D;

private var boxTexture:Texture2D;
private var boxTextureSide = 500;
private var explosionLocations:Vector2[];
private var r = 250;

function Start () {
	//boxTexture = pixelBox.GetComponent(SpriteRenderer).sprite.
	//explosionLocations = new Array();
	explosionLocations = new Vector2[0];
	//this.GetComponent(NetworkView).observed=this.GetComponent(PixelDeformController);

	RenderPixelBox();
}

function Update () {
	
}

function FixedUpdate() {
}


function addExplosion(pos : Vector3) {
	//recreate explosionLocations[] and add one element each time this function is run. then use the array for updating RenderPixelBox(). maybe put a function inside the if(insidecircle) to test for all the circles
	//explosionLocations.Add(pos);
	var tempArr : Vector2[] = new Vector2[explosionLocations.length];
	explosionLocations.CopyTo(tempArr,0);
	explosionLocations = new Vector2[tempArr.length+1];
	tempArr.CopyTo(explosionLocations, 0);
	explosionLocations[explosionLocations.length-1] = pos;
	RenderPixelBox();
}

function RenderPixelBox() {
	boxTexture = Instantiate(origTexture);
	//boxTexture = 
	var W = 500;
	var H = 500;
	var colors = new Color[W*H];
	
	for(var y=0;y<H;y++){
		for(var x=0;x<W;x++){
			if(!IsInsideCircles(x, y)){
				colors[y*W+x] = Color.black;
			}
		}
		//dividing it up into 6 (atm) chunks, one chunk gets to run each frame until it finishes
		if(y%(H/6)==0){
			yield;
		}
	}

	boxTexture.SetPixels(0,0,W,H,colors);
	boxTexture.Apply();
	this.GetComponent(SpriteRenderer).sprite = Sprite.Create(boxTexture,Rect (0, 0, boxTextureSide, boxTextureSide),Vector2(0,0));
	GameObject.Destroy(this.GetComponent(PolygonCollider2D));
	this.gameObject.AddComponent(PolygonCollider2D);
}

function IsInsideCircles(x:int, y:int){
	//if((x-xo)*(x-xo) + (y-yo)*(y-yo) <= r*r){
	for(var i=0;i < explosionLocations.length; i++){
		if((x-explosionLocations[i].x)*(x-explosionLocations[i].x) + (y-explosionLocations[i].y)*(y-explosionLocations[i].y) <= r*r){
			return true;
		}
		//it was this little (seemingly) innocent line of code that crashed unity.
		//i guess it wasn't too smart to print 250 000 lines of logging
		//Debug.Log(explosionLocations[i]);
	}
	return false;
}