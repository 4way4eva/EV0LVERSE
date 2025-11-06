using UnityEngine;

public class SpiralMovement : MonoBehaviour
{
    public float speed = 5.0f;
    public float spiralFactor = 0.1f;

    void Update()
    {
        float x = Mathf.Cos(Time.time * speed) * Time.time * spiralFactor;
        float y = Mathf.Sin(Time.time * speed) * Time.time * spiralFactor;
        transform.position = new Vector3(x, y, 0);
    }
}
