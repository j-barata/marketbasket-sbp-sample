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

import com.github.market.basket.sbp.sample.api.extension.PluginRegister;
import org.pf4j.PluginManager;
import org.pf4j.PluginWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URL;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/plugins")
public class MarketBasketController {

    @Autowired
    private PluginManager pluginManager;

    @Autowired
    private ApplicationContext applicationContext;

    @RequestMapping(value = "/id")
    public List<String> id() {
        List<PluginWrapper> resolvedPlugins = pluginManager.getResolvedPlugins();
        return resolvedPlugins == null ? Collections.emptyList() :
                resolvedPlugins.stream().map(PluginWrapper::getPluginId).collect(Collectors.toList());
    }

    @RequestMapping(value = "/name")
    public List<String> name() {
        List<PluginRegister> registers = pluginManager.getExtensions(PluginRegister.class);
        return registers == null ? Collections.emptyList() :
                registers.stream().map(PluginRegister::name).collect(Collectors.toList());
    }

    @RequestMapping(value = "/resources")
    public List<URL> resources() {
        List<PluginRegister> registers = pluginManager.getExtensions(PluginRegister.class);
        return registers == null ? Collections.emptyList() :
                registers.stream().map(PluginRegister::resources).flatMap(List::stream).collect(Collectors.toList());
    }
}
