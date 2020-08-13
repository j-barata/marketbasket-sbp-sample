/*
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package com.github.market.basket.sbp.sample.update.manager;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.pf4j.PluginManager;
import org.pf4j.PluginState;
import org.pf4j.PluginWrapper;
import org.pf4j.update.PluginInfo;
import org.pf4j.update.UpdateManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/updates")
public class MarketBasketUpdateController {

    @Lazy
    @Autowired
    private UpdateManager updateManager;

    @Lazy
    @Autowired
    private PluginManager pluginManager;

    @RequestMapping(value = "/repositories")
    public ArrayNode repositories() {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(updateManager.getRepositories(), ArrayNode.class);
    }

    @RequestMapping(value = "/available-plugins")
    public ArrayNode availablePlugins() {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(updateManager.getAvailablePlugins(), ArrayNode.class);
    }

    @RequestMapping(value = "/plugins")
    public ArrayNode plugins() {
        ObjectMapper objectMapper = new ObjectMapper();
        List<PluginInfo> plugins = updateManager.getPlugins();

        ArrayNode result = objectMapper.createArrayNode();
        for (PluginInfo info : plugins) {
            ObjectNode node = objectMapper.convertValue(info, ObjectNode.class);
            PluginWrapper wrapper = pluginManager.getPlugin(info.id);
            PluginState state = wrapper != null ? wrapper.getPluginState() : null;
            node.put("state", state != null ? state.name() : "UNINSTALLED");
            result.add(node);
        }
        return result;
    }

    @RequestMapping(value = "/install/{id}/{version}")
    public boolean installPlugin(@PathVariable("id") String id, @PathVariable("version") String version) {
        return updateManager.installPlugin(id, version);
    }

    @RequestMapping(value = "/uninstall/{id}")
    public boolean uninstallPlugin(@PathVariable("id") String id) {
        return updateManager.uninstallPlugin(id);
    }
}
