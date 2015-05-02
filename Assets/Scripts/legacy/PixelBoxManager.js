#pragma strict

public var box:GameObject;

private var boxes:GameObject[];

function Start () {
	boxes = new GameObject[4];
	for(var y=0; y<2; y++){
		for(var x=0; x<2; x++){
			boxes[y*2+x] = Instantiate(box);
			boxes[y*2+x].transform.position = Vector2(-5+5*x,-10+5*y);
		}
	}
	
	//this shouldn't be here, but for the sake of not having to swap scenes atm.
	Network.InitializeServer(6, 25000, false);
}

function Update () {
	//left click
	if(Input.GetMouseButtonDown(0)){
		//explosion((Camera.main.ScreenToWorldPoint(Input.mousePosition)-boxes[i].transform.position)*100);
		this.GetComponent(NetworkView).RPC("explosion", RPCMode.All, Camera.main.ScreenToWorldPoint(Input.mousePosition));
	}
	//right click
	if(Input.GetMouseButtonDown(1)){
	}
	//middle click
	if(Input.GetMouseButtonDown(2)){
	}
}

function FixedUpdate() {
	Camera.main.transform.position = GameObject.Find("Physics box").transform.position+Vector3(0,0,-10);
}

@RPC
function explosion(pos:Vector3) {
	//replace with that circle-detect thing that checks for colliders, should improve performance
	var foundCircles = Physics2D.OverlapCircleAll(pos,2.5,1<<8); //gotta love that AllLayers is simply -1
	var adjustedPos:Vector3;
		for(var i=0; i<foundCircles.length; i++){
			adjustedPos = (pos-foundCircles[i].transform.position)*100;
			foundCircles[i].GetComponent(PixelDeformController).addExplosion(adjustedPos);
			//boxes[i].GetComponent(NetworkView).RPC("addExplosion", RPCMode.All, (Camera.main.ScreenToWorldPoint(Input.mousePosition)-boxes[i].transform.position)*100);
			//addExplosion(Vector2(250,250));
			Debug.Log("x: " + Input.mousePosition.x + " y: " + Input.mousePosition.y + "box#: " + i);
		}
}