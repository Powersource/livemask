#pragma strict

//README
//this file does two(i think) things, both which are unneeded from now on:
//1. on every fixedupdate, replaces the polygoncollider on 'player'. it has
//a static texture so far(wink wink) so doesn't really do anything.
//2. spawns and draws the adjustable box that follows the mouse

var Box:GameObject;
var LinePrefab:GameObject;
var Line:GameObject;
var polyCollider:PolygonCollider2D;
var colliderPath:Vector2[];

function Start () {
	Box = GameObject.Find("Box");
	polyCollider = Box.GetComponent(PolygonCollider2D);
	colliderPath = polyCollider.GetPath(0);
	
	Line = GameObject.Instantiate(LinePrefab);
	Line.GetComponent(LineRenderer).SetVertexCount(colliderPath.Length + 1);
	UpdateLines();
}

function Update () {
	
}

function FixedUpdate(){
	//Debug.Log(Camera.main.ScreenToWorldPoint(Input.mousePosition));
	//if(Input.GetMouseButtonDown(0)){
	//}
	var pointArray = polyCollider.points;
	//the scale is needed if it's off 1, which it won't have to be if i create the graphics on the fly
	//pointArray[3] = Vector2((Camera.main.ScreenToWorldPoint(Input.mousePosition).x - Box.transform.position.x)/Box.transform.localScale.x,
	//(Camera.main.ScreenToWorldPoint(Input.mousePosition).y - Box.transform.position.y)/Box.transform.localScale.y);
	pointArray[3] = Vector2(Camera.main.ScreenToWorldPoint(Input.mousePosition).x - Box.transform.position.x, Camera.main.ScreenToWorldPoint(Input.mousePosition).y - Box.transform.position.y);
	/*for(var i=0;i<polyCollider.points.length;i++){
		Debug.Log(i + ": " + polyCollider.points[i].ToString());
	}*/
	polyCollider.points = pointArray;
	
	//GameObject.Find("Line(Clone)").GetComponent(LineRenderer).SetPosition(1,Vector3(Camera.main.ScreenToWorldPoint(Input.mousePosition).x,Camera.main.ScreenToWorldPoint(Input.mousePosition).y,0));
	
	colliderPath = polyCollider.GetPath(0);
	UpdateLines();
	
	GameObject.Destroy(GameObject.Find("Player").GetComponent(PolygonCollider2D));
	GameObject.Find("Player").AddComponent(PolygonCollider2D);
}

function UpdateLines() {
	for(var i = 0; i < colliderPath.Length; i++){
		Line.GetComponent(LineRenderer).SetPosition(i,Vector3(colliderPath[i].x + Box.transform.position.x,colliderPath[i].y + Box.transform.position.y,0));
	}
	Line.GetComponent(LineRenderer).SetPosition(colliderPath.Length,Vector3(colliderPath[0].x + Box.transform.position.x,colliderPath[0].y + Box.transform.position.y,0));
}