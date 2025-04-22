import sounddevice as sd

# Sampling rate (Hz)
samplerate = 44100

# Duration of each audio buffer in seconds
blocksize = 1024

# This callback function is called automatically to process audio
def callback(indata, outdata, frames, time, status):
    if status:
        print(f"Status: {status}")
    outdata[:] = indata  # Just pass input straight to output

# Start the stream
with sd.Stream(samplerate=samplerate,
               blocksize=blocksize,
               channels=1,
               dtype='float32',
               callback=callback):
    print("🎙️ Mic is live, press Ctrl+C to stop...")
    try:
        while True:
            sd.sleep(1000)  # Just keep it alive
    except KeyboardInterrupt:
        print("\n👋 Exiting...")
