#Docker file compose of a set of instruction like from env cmd, run. Where instruction can also be called as directive.
#Start a new build image and Set the base image. Its 1st Directive in dockerfile except ARG
FROM ubuntu:bionic

#Set enviornment property
ENV WEBSITE_VERSION 1.0.0
ENV IMAGE_VERSION 1.0.0
ENV NGINX_VERSION 1.14.0-0ubuntu1.3

#To run command
RUN apt-get update && apt-get install -y curl
RUN apt-get update && apt-get install -y nginx
RUN echo "Image version ${IMAGE_VERSION}"

#To set the current directive . The path can also be absolute ex www . actual path is /var/www. Multiple workdir can also be added.
# WORKDIR /var
# WORKDIR www

WORKDIR /var/www/html

#Copy is used to copy file from local machine to image 
COPY index.html ./

#ADD is also similar to COPY. addition is it can be used to pull file through URL or extract an archive into loose file into image
COPY wishlist/. ./wishlist/

#Port on which image listen to
EXPOSE 80

#Default command used to run a container at execution time
CMD [ "nginx","-g","daemon off;" ]

#Build a dockerfile: docker build -t custom-website .

#Signal used to stop the container. By default it is already there. But if we need to some extra thing to do before stop we can define our own
STOPSIGNAL SIGTERM

#To get healthcheck of container and if not respond then docker engine will know automatically
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl","localhost:8080" ]