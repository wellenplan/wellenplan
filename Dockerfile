FROM registry.access.redhat.com/ubi9/nodejs-16:1-44 AS builder

ADD --chown=1001:0 ./ $HOME

RUN npm install \
 && mkdir -p $HOME/src/extensions/{displays,endpoints,hooks,interfaces,layouts,migrations,modules,operations,panels}

FROM registry.access.redhat.com/ubi9/nodejs-16-minimal:1-42

ENV EXTENSIONS_PATH="$HOME/src/extensions"

COPY --from=builder --chown=0:0 $HOME $HOME

CMD npm run -d start