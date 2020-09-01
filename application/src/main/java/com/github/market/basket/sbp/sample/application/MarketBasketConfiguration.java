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

import com.github.market.basket.sbp.sample.api.IFruit;
import com.github.market.basket.sbp.sample.api.IMushroom;
import com.github.market.basket.sbp.sample.api.IVegetable;
import com.github.market.basket.sbp.sample.api.IWidgetProvider;
import org.pf4j.PluginManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;

import java.util.List;

@Configuration
public class MarketBasketConfiguration {

    @Lazy
    @Autowired
    private PluginManager pluginManager;

    @Bean
    public List<IFruit> fruitsComponent() {
        return pluginManager.getExtensions(IFruit.class);
    }

    @Bean
    public List<IVegetable> vegetablesComponent() {
        return pluginManager.getExtensions(IVegetable.class);
    }

    @Bean
    public List<IMushroom> mushroomsComponent() {
        return pluginManager.getExtensions(IMushroom.class);
    }

    @Bean
    public List<IWidgetProvider> widgetProviders() {
        return pluginManager.getExtensions(IWidgetProvider.class);
    }
}
