Shader "Custom/boxShader" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
	}
	SubShader {
		Pass {
			
			CGPROGRAM
			#pragma vertex vert
			#pragma fragment frag

			sampler2D _MainTex;

			struct fragInput {
				float2 uv_MainTex;
				float4 pos : TEXCOORD0;
				float4 vpos : SV_POSITION;
			};
			
			struct vertInput {
				float2 uv_MainTex;
				float4 pos : TEXCOORD0;
				float4 vpos : POSITION;
			};
			
			fragInput vert (vertInput IN) : POSITION {
				fragInput OUT;
				//OUT.uv_MainTex = IN.uv_MainTex; //uncomment this and it breaks
				OUT.pos = IN.pos;
				OUT.vpos = mul (UNITY_MATRIX_MVP, IN.vpos);
				return OUT;
			}

			float4 frag (fragInput IN) : COLOR {
	//			half4 c = tex2D (_MainTex, IN.uv_MainTex);
	//			//half4 c = half4(1,0,0,1);
	//			o.Albedo = c.rgb;
	//			o.Alpha = c.a;
				float3 pos = float3(IN.pos.xy,0); //resolution.x-.5;
	  			if(pow(pos.x-.5, 2.)+pow(pos.y-.5, 2.)<.25*.25){
	    			return float4(1,1,0,0); 
	  			} else{
	    			return float4(pos.xy,0,1);
	  			}
			}
			ENDCG
		}
	} 
}
