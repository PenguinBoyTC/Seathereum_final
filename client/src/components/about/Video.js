import React from 'react';

const Video = () => (
  <div className="embed-responsive embed-responsive-16by9">
    <iframe
      className="embed-responsive-item p-4"
      src="https://drive.google.com/file/d/1kIUDdWmEf_KLF_cqtOh8LWGXq21otcPK/preview"
      title="video"
      allowFullScreen={true}
    />
  </div>
);

export default Video;
