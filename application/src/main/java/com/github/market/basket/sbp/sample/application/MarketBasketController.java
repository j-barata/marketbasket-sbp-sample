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
package com.github.market.basket.sbp.sample.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.github.market.basket.sbp.sample.api.IWidgetProvider;
import com.github.market.basket.sbp.sample.api.extension.IPluginRegister;
import org.pf4j.PluginManager;
import org.pf4j.PluginWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/plugins")
public class MarketBasketController {

    @Autowired
    private PluginManager pluginManager;

    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private MarketBasketComponent marketBasketComponent;

    @Lazy
    @Autowired
    private List<IWidgetProvider> widgetProviders;

    @RequestMapping(value = "/id")
    public List<String> id() {
        List<PluginWrapper> resolvedPlugins = pluginManager.getResolvedPlugins();
        return resolvedPlugins == null ? Collections.emptyList() :
                resolvedPlugins.stream().map(PluginWrapper::getPluginId).collect(Collectors.toList());
    }

    @RequestMapping(value = "/name")
    public List<String> name() {
        List<IPluginRegister> registers = pluginManager.getExtensions(IPluginRegister.class);
        return registers == null ? Collections.emptyList() :
                registers.stream().map(IPluginRegister::name).collect(Collectors.toList());
    }

    @RequestMapping(value = "/resources")
    public List<URL> resources() {
        List<IPluginRegister> registers = pluginManager.getExtensions(IPluginRegister.class);
        return registers == null ? Collections.emptyList() :
                registers.stream().map(IPluginRegister::resources).flatMap(List::stream).collect(Collectors.toList());
    }

    @RequestMapping(value = "/basket")
    public List<String> basket() {
        return marketBasketComponent.basket();
    }

    @RequestMapping(value = "/resolved")
    public ArrayNode resolvedPlugins() {
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(PluginWrapper.class, new PluginWrapperSerializer());
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(simpleModule);
        return objectMapper.convertValue(pluginManager.getResolvedPlugins(), ArrayNode.class);
    }

    @RequestMapping(value = "/all")
    public ArrayNode allPlugins() {
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(PluginWrapper.class, new PluginWrapperSerializer());
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(simpleModule);
        return objectMapper.convertValue(pluginManager.getPlugins(), ArrayNode.class);
    }

    @RequestMapping(value = "/widgets/{key}")
    public List<String> widgets(@PathVariable(name="key") String key) {
        List<IWidgetProvider> providers = pluginManager.getExtensions(IWidgetProvider.class);
        if (providers != null) {
            return providers.stream()
                    .map(IWidgetProvider::providedWidgets)
                    .map(p -> p.get(key))
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
}
