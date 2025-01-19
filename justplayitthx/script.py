from flask import Flask, render_template, request, jsonify, redirect, url_for, session
import os
import yt_dlp as ydl
import shutil

x = 0
url_file = 'urls.json'
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/goto_index')
def goot_index():
    return redirect(url_for('index'))

@app.route('/player')
def player():
    video_file = request.args.get('video_file') 
    if not video_file:
        return redirect(url_for('index'))
    return render_template('player.html', video_file=video_file, title=title)

@app.route('/link', methods=['POST'])
def handle_link():
    data = request.json
    if not data or 'link' not in data:
        return jsonify({"error": "Missing 'url' in request"}), 400

    link = data['link']
    print(f"Received URL: {link}")
    video_file = download_video(link) 

    return jsonify({"message": "URL received successfully!", "video": video_file, "redirect_url": url_for('player', video_file=video_file)}), 200

def download_video(url):
    global x
    x += 1
    save_path = f"{os.getcwd()}/static/videos/"
    try:
        ydl_opts = {
            'format': 'bestvideo+bestaudio/best',
            'outtmpl': os.path.join(save_path, f'{x}.mp4'),
            'merge_output_format': 'mp4',
        }
        with ydl.YoutubeDL(ydl_opts) as ydl_instance:
            info_dict = ydl_instance.extract_info(url, download=True)
            global title
            title = info_dict.get('title', None)
            print(f"Downloaded: {info_dict['title']}")
            return f'{x}.mp4' 
    except Exception as e:
        print(f"Error: {e}")
        return None
    
if __name__ == '__main__':
    print("removing video cache...")
    shutil.rmtree(f"{os.getcwd()}/static/videos/")
    os.mkdir(f"{os.getcwd()}/static/videos/")
    app.run(port=5000)
